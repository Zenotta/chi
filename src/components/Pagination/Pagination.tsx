import React, {forwardRef, useEffect, useImperativeHandle, useState,} from 'react';
import styles from './Pagination.scss';
import {STORYBOOK_VALS, transparentizeColour} from '../../utils';

export interface PaginationProps {
    totalItems: number,
    itemsPerPage: number,
    maxPageNumbersDisplayed: number,
    onPaginate: Function,
    vSize?: number,
    variant?: 'bordered',
    mainColor?: string,
    textColor?: string,
    backgroundColor?: string,
    hoverColor?: string,
    borderColor?: string,
    className?: string,
    disableArrows?: boolean,
    enableStrokeAnimation?: boolean,
    enableArrowBorder?: boolean,
    enableArrowBackground?: boolean,
}

const DEFAULT_TEXT_COLOR = '#000000';

export const Pagination = forwardRef((props: PaginationProps, ref) => {
    const [currentPage, setCurrentPage] = useState(1)

    const setMaxPagesDisplayed = (maxPages: number): number => {
        let validMaxPages: boolean = false
        let currentMax: number = maxPages
        while (!validMaxPages) {
            currentMax++
            if (currentMax > 3 && currentMax % 2 != 0) {
                validMaxPages = true
                break
            }
        }
        return currentMax
    }

    const setPageNumbers = (totalItems: number, itemsPerPage: number): number[] => {
        let pageNumbers: number[] = []
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i)
        }
        return pageNumbers
    }

    const setPageSlices = (pageNumbers: number[], maxPageNumbersDisplayed: number): number[] => {
        const pageSliceSize = maxPageNumbersDisplayed - 2
        if (pageNumbers.length - maxPageNumbersDisplayed >= 2) {
            if (currentPage < pageSliceSize + 1) {
                return pageNumbers.slice(0, pageSliceSize + 1)
            } else if (pageNumbers.length - currentPage < pageSliceSize) {
                return pageNumbers.slice(
                    pageNumbers.length - pageSliceSize - 1,
                    pageNumbers.length,
                )
            } else {
                return pageNumbers.slice(
                    currentPage - (pageSliceSize - 1) / 2 - 1,
                    currentPage + (pageSliceSize - 1) / 2,
                )
            }
        } else {
            return pageNumbers
        }
    }

    const paginate = (pageNumber: number) => {
        pageNumbers.length + 1 > pageNumber && pageNumber > 0
            ? setCurrentPage(pageNumber)
            : null
    }

    const setTheme = (): any => {
        let cssProperties: any = []
        cssProperties['--vsize'] = vSize
        cssProperties['--selected'] = mainColor
        cssProperties['--text'] = textColor
        cssProperties['--bg'] = backgroundColor
        cssProperties['--selected-hover'] = transparentizeColour(hoverColor, 0.6)
        cssProperties['--border-color'] = transparentizeColour(borderColor, 0.5)
        return cssProperties
    }

    let mainColor = props.mainColor ? props.mainColor : STORYBOOK_VALS.lightGray
    let backgroundColor = props.backgroundColor
        ? props.backgroundColor
        : STORYBOOK_VALS.smokeBg
    let textColor = props.textColor ? props.textColor : DEFAULT_TEXT_COLOR
    let borderColor = props.borderColor ? props.borderColor : STORYBOOK_VALS.darkGray
    let hoverColor = props.hoverColor ? props.hoverColor : mainColor
    let itemsPerPage = props.itemsPerPage > 1 ? props.itemsPerPage : 1
    let totalItems = props.totalItems > 1 ? props.totalItems : 1
    let vSize = props.vSize ? props.vSize : 2
    let maxPageNumbersDisplayed =
        props.maxPageNumbersDisplayed > 3 && props.maxPageNumbersDisplayed % 2 != 0
            ? props.maxPageNumbersDisplayed
            : setMaxPagesDisplayed(props.maxPageNumbersDisplayed)

    const pageNumbers: number[] = setPageNumbers(totalItems, itemsPerPage)
    let slicedPageNumbers: number[] = setPageSlices(pageNumbers, maxPageNumbersDisplayed)

    useEffect(() => {
        props.onPaginate(currentPage)
    }, [currentPage])

    useImperativeHandle(ref, () => {
        return {
            paginate: paginate,
        }
    })

    return (
        <>
            {pageNumbers.length > 1 && (
                <nav
                    style={setTheme()}
                    className={`${styles.pagination} ${props.className}`}
                >
                    {!props.disableArrows && (
                        <div className={`${styles.arrowContainer} ${styles.arrowLeft}`}>
                            <a className={styles.linkArrowed}>
                                <svg
                                    className={`${styles.arrowIcon} ${styles.arrowIconCircle} ${props.enableArrowBackground
                                        ? `${styles.arrowBackgroundEnabled}`
                                        : {}
                                    }`}
                                    onClick={() => paginate(currentPage - 1)}
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                >
                                    <g
                                        fill="none"
                                        stroke={textColor}
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                    >
                                        <circle
                                            strokeWidth="1"
                                            stroke={borderColor}
                                            style={
                                                props.enableArrowBorder ? {strokeDashoffset: 1} : {}
                                            }
                                            className={`${styles.arrowIconCircle} ${props.enableStrokeAnimation
                                                ? `${styles.arrowStrokeAnimation}`
                                                : {}
                                            }`}
                                            cx="16"
                                            cy="16"
                                            r="15.12"
                                        />
                                        <path d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"/>
                                    </g>
                                </svg>
                            </a>
                        </div>
                    )}
                    <div className={styles.pageNumbers}>
                        <ul
                            style={{
                                borderStyle: props.variant == 'bordered' ? 'solid' : 'none',
                            }}
                        >
                            {!slicedPageNumbers.includes(1) && (
                                <li
                                    key={1}
                                    className={`${styles.pageNumber} ${1 == currentPage ? styles.activePageNumber : null
                                    }`}
                                    onClick={() => paginate(1)}
                                >
                                    <a>{1}</a>
                                </li>
                            )}
                            {!slicedPageNumbers.includes(1) && (
                                <li className={styles.pageNumberSpacer}>
                                    <a>...</a>
                                </li>
                            )}
                            {slicedPageNumbers.map((number) => (
                                <li
                                    key={number}
                                    className={`${styles.pageNumber} ${number == currentPage ? styles.activePageNumber : null
                                    }`}
                                    onClick={() => paginate(number)}
                                >
                                    <a>{number}</a>
                                </li>
                            ))}
                            {!slicedPageNumbers.includes(pageNumbers.length) && (
                                <li className={styles.pageNumberSpacer}>
                                    <a>...</a>
                                </li>
                            )}
                            {!slicedPageNumbers.includes(pageNumbers.length) && (
                                <li
                                    key={pageNumbers.length}
                                    className={`${styles.pageNumber} ${pageNumbers.length == currentPage
                                        ? styles.activePageNumber
                                        : null
                                    }`}
                                    onClick={() => paginate(pageNumbers.length)}
                                >
                                    <a>{pageNumbers.length}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                    {!props.disableArrows && (
                        <div className={styles.arrowContainer}>
                            <a className={styles.linkArrowed}>
                                <svg
                                    className={`${styles.arrowIcon} ${styles.arrowIconCircle} ${props.enableArrowBackground
                                        ? `${styles.arrowBackgroundEnabled}`
                                        : {}
                                    }`}
                                    onClick={() => paginate(currentPage + 1)}
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                >
                                    <g
                                        fill="none"
                                        stroke={textColor}
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="10"
                                    >
                                        <circle
                                            strokeWidth="1"
                                            stroke={borderColor}
                                            style={
                                                props.enableArrowBorder ? {strokeDashoffset: 1} : {}
                                            }
                                            className={`${styles.arrowIconCircle} ${props.enableStrokeAnimation
                                                ? `${styles.arrowStrokeAnimation}`
                                                : {}
                                            }`}
                                            cx="16"
                                            cy="16"
                                            r="15.12"
                                        />
                                        <path
                                            className={styles.arrowIconArrow}
                                            d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"
                                        />
                                    </g>
                                </svg>
                            </a>
                        </div>
                    )}
                </nav>
            )}
        </>
    )
})
