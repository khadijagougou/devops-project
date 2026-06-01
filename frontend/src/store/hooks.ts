import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/** Pre-typed dispatch — use instead of plain useDispatch */
export const useAppDispatch: () => AppDispatch = useDispatch;

/** Pre-typed selector — use instead of plain useSelector */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
