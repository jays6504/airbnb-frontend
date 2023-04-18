import React, { useState, useEffect, useRef } from 'react'
import { IStayPreview } from '../../../interfaces/stay'
import { StayPreview } from './stay.preview'

interface IListProps {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    isMapView: boolean
    isLoading: boolean
    STAYS_INCREMENT_BY: number
    loadMoreStays: (pageIndex?: number) => void
    onStayClick: (stayId: string) => void
    totalPages: number | null
}

export const StayList: React.FC<IListProps> = ({
    stays,
    onAddToWishlist,
    isMapView,
    isLoading,
    STAYS_INCREMENT_BY: skeletonNum,
    loadMoreStays,
    onStayClick,
    totalPages,
}) => {
    const [lastStayRef, setLastStayRef] = useState<HTMLDivElement | null>(null)
    const pageIdx = useRef<number>(0)

    useEffect(() => {
        if (!totalPages || (totalPages && pageIdx.current >= totalPages)) return
        const observer = new IntersectionObserver(
            entries => {
                const lastStay = entries[0]
                if (lastStay.isIntersecting && !isLoading) {
                    // Load the next set of stays
                    pageIdx.current++
                    loadMoreStays(pageIdx.current)
                }
            },
            { threshold: 0 }
        )

        if (lastStayRef) {
            observer.observe(lastStayRef)
        }

        return () => {
            if (lastStayRef) {
                observer.unobserve(lastStayRef)
            }
        }
    }, [lastStayRef, loadMoreStays, isLoading])

    const skeletonProps = {
        stay: undefined,
        isMapView: false,
        onAddToWishlist,
        onStayClick,
    }
    const previewProps = (stay: IStayPreview) => {
        return { stay, onAddToWishlist, isMapView, onStayClick }
    }
    function makeSkeletonArray() {
        return Array.from({ length: skeletonNum }, (_, index) => (
            <StayPreview key={`skp-${index}`} {...skeletonProps} />
        ))
    }
    return (
        <section className='stay-list main-layout'>
            {stays.length
                ? stays.map((stay, index) => (
                      <div key={`${stay._id + index}`}>
                          <StayPreview {...previewProps(stay)} delay={(skeletonNum % 20) * 25} />
                          {index === stays.length - 1 && !isLoading && (
                              <div className='scroll-indicator' ref={setLastStayRef}></div>
                          )}
                      </div>
                  ))
                : makeSkeletonArray()}
            {isLoading && stays.length ? makeSkeletonArray() : null}
        </section>
    )
}
