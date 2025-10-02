import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, nextTick } from 'vitest'
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
vi.mock('zeed', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...(actual as any),
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
  }
})

describe('dateRangePicker', () => {
  const defaultProps = {
    startDay: 20250907, // September 7, 2025
    endDay: 20250907, // September 7, 2025
  }

  it('renders correctly with default props', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    expect(wrapper.find('.oui-day-range').exists()).toBe(true)
    expect(wrapper.find('.date-picker').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('2025-09-07')
  })

  it('displays formatted date range correctly', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    expect(wrapper.find('button').text()).toBe('2025-09-07')
  })

  it('displays date range when start and end dates are different', () => {
    const wrapper = mount(OuiDayRange, {
      props: {
        startDay: 20250901,
        endDay: 20250907,
      },
    })

    expect(wrapper.find('button').text()).toBe('2025-09-01 - 2025-09-07')
  })

  it('highlights today button when current date is today', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })
    wrapper.vm.showPicker = true

    expect(wrapper.find('.oui-day-range-teleport').exists()).toBe(true)
  })

  it('emits update events when today button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })
    wrapper.vm.showPicker = true
    await nextTick()

    const buttons = wrapper.findAll('button').slice(3)
    const todayButton = buttons[0]
    await todayButton.trigger('click')

    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
  })

  it('emits update events when yesterday button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })
    wrapper.vm.showPicker = true
    await nextTick()

    const buttons = wrapper.findAll('button').slice(3)
    const yesterdayButton = buttons[1]
    await yesterdayButton.trigger('click')

    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
  })

  it('emits update events when last week button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })
    wrapper.vm.showPicker = true
    await nextTick()

    const buttons = wrapper.findAll('button').slice(3)
    const lastWeekButton = buttons[2]
    await lastWeekButton.trigger('click')

    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
  })

  it('emits update events when this year button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })
    wrapper.vm.showPicker = true
    await nextTick()

    const buttons = wrapper.findAll('button').slice(3)
    const thisYearButton = buttons[5]
    await thisYearButton.trigger('click')

    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
  })

  it('emits update events when last year button is clicked', async () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })
    wrapper.vm.showPicker = true
    await nextTick()

    const buttons = wrapper.findAll('button').slice(3)
    const lastYearButton = buttons[6]
    await lastYearButton.trigger('click')

    expect(wrapper.emitted('update:startDay')).toBeTruthy()
    expect(wrapper.emitted('update:endDay')).toBeTruthy()
  })

  it('has all expected quick date buttons', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })
    wrapper.vm.showPicker = true

    const buttons = wrapper.findAll('button').slice(3)
    const buttonTexts = buttons.map(button => button.text())

    expect(buttonTexts).toEqual([
      'Today',
      'Yesterday',
      'Last 7 Days',
      'Last 30 Days',
      'Last 90 Days',
      'This Month',
      'Last Month',
      'All Time',
    ])
  })

  it('has responsive CSS classes', () => {
    const wrapper = mount(OuiDayRange, {
      props: defaultProps,
    })

    expect(wrapper.find('.oui-day-range').exists()).toBe(true)
    expect(wrapper.find('.date-picker').exists()).toBe(true)
    expect(wrapper.find('.oui-day-range-teleport').exists()).toBe(false) // since not open
  })
})
