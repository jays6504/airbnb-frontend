const ITEMS_TO_PREVIEW = 5

export function ImageGallery({ imgUrls = [] }: { imgUrls: string[] | undefined }) {
    return (
        <section className='image-gallery'>
            {!imgUrls.length
                ? skeleton()
                : imgUrls
                      .slice(0, ITEMS_TO_PREVIEW)
                      .map((imgUrl, idx) => <img className='image-gallery-item' src={imgUrl} key={`g-i-${idx}`} />)}
        </section>
    )
}

function skeleton() {
    console.log('skeletons:')
    const skeletonsArray = Array.from({ length: ITEMS_TO_PREVIEW })
    return skeletonsArray.map((_, idx) => <div key={`g-s-${idx}`} className='skeleton-details img-skeleton'></div>)
}
