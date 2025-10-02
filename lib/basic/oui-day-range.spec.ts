import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import OuiDayRange from './oui-day-range.vue'

// Mock v-calendar DatePicker
vi.mock('v-calendar', () => ({
  DatePicker: {
    name: 'DatePicker',
    template: '<div data-testid="date-picker"></div>',
    props: ['modelValue', 'mode', 'isRange', 'placeholder', 'columns'],
    emits: ['update:modelValue'],
  },
}))

// Mock zeed functions
vi.mock('zeed', () => ({
  dayFromDate: vi.fn((date: Date) => {
    // Convert date to YYYYMMDD format
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return Number.parseInt(`${year}${month}${day}`)
  }),
  dayFromToday: vi.fn(() => 20250907), // Mock today as September 7, 2025
  dayMonthStart: vi.fn((dayValue: number, offset: number = 0) => {
    // Get start of month with optional month offset
    const str = dayValue.toString()
    const year = Number.parseInt(str.substring(0, 4))
    const month = Number.parseInt(str.substring(4, 6)) - 1
    const date = new Date(year, month + offset, 1) // First day of month

    const newYear = date.getFullYear()
    const newMonth = String(date.getMonth() + 1).padStart(2, '0')
    const newDay = '01'
    return Number.parseInt(`${newYear}${newMonth}${newDay}`)
  }),
  dayOffset: vi.fn((dayValue: number, offset: number) => {
    // Simple implementation for testing - convert to date, add days, convert back
    const str = dayValue.toString()
    const year = Number.parseInt(str.substring(0, 4))
    const month = Number.parseInt(str.substring(4, 6)) - 1
    const day = Number.parseInt(str.substring(6, 8))
    const date = new Date(year, month, day)
    date.setDate(date.getDate() + offset)

    const newYear = date.getFullYear()
    const newMonth = String(date.getMonth() + 1).padStart(2, '0')
    const newDay = String(date.getDate()).padStart(2, '0')
    return Number.parseInt(`${newYear}${newMonth}${newDay}`)
  }),
  dayToDate: vi.fn((dayValue: number) => {
    // Convert YYYYMMDD to Date
    const str = dayValue.toString()
    const year = Number.parseInt(str.substring(0, 4))
    const month = Number.parseInt(str.substring(4, 6)) - 1
    const day = Number.parseInt(str.substring(6, 8))
    return new Date(year, month, day)
  }),
  dayToString: vi.fn((dayValue: number) => {
    // Convert YYYYMMDD to YYYY-MM-DD
    const str = dayValue.toString()
    const year = str.substring(0, 4)
    const month = str.substring(4, 6)
    const day = str.substring(6, 8)
    return `${year}-${month}-${day}`
  }),
  dayFromString: vi.fn((dateString: string) => {
    // Convert YYYY-MM-DD to YYYYMMDD
    const [year, month, day] = dateString.split('-')
    return Number.parseInt(`${year}${month}${day}`)
  }),
}))

describe('dateRangePicker', () => {
  const defaultProps = {
    startDay: 20250907, // September 7, 2025
    endDay: 20250907, // September 7, 2025
  }

  it('renders correctly with default props', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    expect(wrapper.find('.date-range-picker').exists()).toBe(true)
    expect(wrapper.find('h2').text()).toContain('Daily Summary')
    expect(wrapper.find('[data-testid="date-picker"]').exists()).toBe(true)
  })

  it('displays formatted date range correctly', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    expect(wrapper.find('h2').text()).toContain('Daily Summary (2025-09-07)')
  })

  it('displays date range when start and end dates are different', () => {
    const wrapper = mount(OuiDayRange, {
      props: {
        startDay: 20250901, // September 1, 2025
        endDay: 20250907, // September 7, 2025
      },
    })

    expect(wrapper.find('h2').text()).toContain('Daily Summary (2025-09-01 - 2025-09-07)')
  })

  it('highlights today button when current date is today', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    const todayButton = wrapper.find('.quick-date-btn')
    expect(todayButton.text()).toBe('Today')
    expect(todayButton.classes()).toContain('active')
  })

  it('emits update events when today button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: {
        startDay: 20250901, // Different from today
        endDay: 20250901,
      },
    })

    const todayButton = wrapper.find('.quick-date-btn')
    await todayButton.trigger('click')

    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
    expect(wrapper.emitted('update:startDay')![0]).toEqual([20250907])
    expect(wrapper.emitted('update:endDay')![0]).toEqual([20250907])
  })

  it('emits update events when yesterday button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    const yesterdayButton = wrapper.findAll('.quick-date-btn')[1]
    await yesterdayButton.trigger('click')

    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
    expect(wrapper.emitted('update:startDay')![0]).toEqual([20250906]) // Yesterday
    expect(wrapper.emitted('update:endDay')![0]).toEqual([20250906])
  })

  it('emits update events when last week button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    const lastWeekButton = wrapper.findAll('.quick-date-btn')[2]
    await lastWeekButton.trigger('click')

    // Should emit startDay because it changes from 20250907 to 20250831
    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:startDay')![0]).toEqual([20250831]) // 7 days ago

    // Should NOT emit endDay because it doesn't change (stays 20250907)
    expect(wrapper.emitted('update:endDay')).toBeFalsy()
  })

  it('emits update events when this year button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    const thisYearButton = wrapper.findAll('.quick-date-btn')[6] // This Year is 7th button (index 6)
    await thisYearButton.trigger('click')

    // Should emit startDay because it changes from 20250907 to 20250101 (Jan 1, 2025)
    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:startDay')![0]).toEqual([20250101]) // January 1, 2025

    // Should NOT emit endDay because it doesn't change (stays 20250907)
    expect(wrapper.emitted('update:endDay')).toBeFalsy()
  })

  it('emits update events when last year button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    const lastYearButton = wrapper.findAll('.quick-date-btn')[7] // Last Year is 8th button (index 7)
    await lastYearButton.trigger('click')

    // Should emit both because both dates change
    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
    expect(wrapper.emitted('update:startDay')![0]).toEqual([20240101]) // January 1, 2024
    expect(wrapper.emitted('update:endDay')![0]).toEqual([20241231]) // December 31, 2024
  })

  it('has all expected quick date buttons', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    const buttons = wrapper.findAll('.quick-date-btn')
    const buttonTexts = buttons.map(button => button.text())

    expect(buttonTexts).toEqual([
      'Today',
      'Yesterday',
      'Last Week',
      'This Week',
      'This Month',
      'Last Month',
      'This Year',
      'Last Year',
    ])
  })

  it('has responsive CSS classes', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    expect(wrapper.find('.section-header').exists()).toBe(true)
    expect(wrapper.find('.date-picker-container').exists()).toBe(true)
    expect(wrapper.find('.quick-date-buttons').exists()).toBe(true)
  })
})
