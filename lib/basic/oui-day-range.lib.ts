import type { DayValue } from 'zeed'
import { dayDiff, dayFromToday, dayMonthStart, dayOffset, dayToDate, dayYearStart } from 'zeed'

export type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom'

/// Sunday = 0, Monday = 1, ... (See below):
export const firstDayOfWeek: any = 1

export const today = dayFromToday()

/**
 * Compute the start day of the week for a given day.
 *
 * Given a DayValue, this function returns the DayValue that corresponds to the
 * first day of the week containing that day. The first day of the week is
 * controlled by `firstDayOfWeek` (0 = Sunday, 1 = Monday, ...), matching
 * JavaScript's Date.getDay() indexing. An `offset` may be provided to move
 * the result by whole weeks: 0 returns the start of the current week,
 * 1 returns the start of the next week, -1 the start of the previous week, etc.
 *
 * @param {DayValue} [day] - The input day (defaults to today).
 * @param {number} [offset] - Number of weeks to shift the computed week start.
 * @param {number} [firstDayOfWeek] - Index of the week's first day (0 = Sunday).
 *
 * @returns {DayValue} The DayValue representing the first day of the (offset) week.
 *
 * @remarks
 * Internally converts the DayValue to a Date, computes the weekday delta
 * relative to `firstDayOfWeek`, and applies a day offset (offset * 7 + correction).
 * This relies on the project's helpers (dayToDate, dayOffset) and preserves the
 * project's DayValue representation.
 */
export function dayWeekStart(day = dayFromToday(), offset = 0, firstDayOfWeek = 1): DayValue {
  const _date = dayToDate(day)
  const _dayIndex = _date.getDay()
  const _delta = (_dayIndex - firstDayOfWeek + 7) % 7
  const _daysToStart = -_delta + offset * 7
  return dayOffset(day, _daysToStart)
}

export function dayMaxToday(day: DayValue, maxToday = true): DayValue {
  return maxToday ? Math.min(day, today) : day
}

export function dayRangeWeek(day = dayFromToday(), offset = 0, firstDayOfWeek = 1, maxToday = true): [DayValue, DayValue] {
  return [
    dayMaxToday(dayWeekStart(day, offset, firstDayOfWeek), maxToday),
    dayMaxToday(dayOffset(dayWeekStart(day, offset, firstDayOfWeek), 6), maxToday),
  ]
}

export function dayRangeMonth(day = dayFromToday(), offset = 0, maxToday = true): [DayValue, DayValue] {
  return [
    dayMaxToday(dayMonthStart(day, offset), maxToday),
    dayMaxToday(dayOffset(dayMonthStart(day, offset + 1), -1), maxToday),
  ]
}

export function dayRangeYear(day = dayFromToday(), offset = 0, maxToday = true): [DayValue, DayValue] {
  return [
    dayMaxToday(dayYearStart(day, offset), maxToday),
    dayMaxToday(dayOffset(dayYearStart(day, offset + 1), -1), maxToday),
  ]
}

export function dayRangePeriod(startDay: DayValue, endDay: DayValue, offset: number, periodType?: PeriodType): [DayValue, DayValue] {
  if (periodType === 'week')
    return dayRangeWeek(startDay, offset)
  if (periodType === 'month')
    return dayRangeMonth(startDay, offset)
  if (periodType === 'year')
    return dayRangeYear(startDay, offset)

  const duration = dayDiff(startDay, endDay) + 1
  return [
    dayOffset(startDay, duration * offset),
    dayOffset(endDay, duration * offset),
  ]
}
