const ITEMS_TO_PREVIEW = 5

export function ImageGallery({ imgUrls }: { imgUrls: string[] | undefined }) {
    if (!imgUrls || !imgUrls.length) return <div className='loader'></div>

    return (
        <section className='image-gallery'>
            {!imgUrls || !imgUrls.length
                ? skeleton()
                : imgUrls
                      .slice(0, ITEMS_TO_PREVIEW)
                      .map((imgUrl, idx) => <img className='image-gallery-item' src={imgUrl} key={`g-i-${idx}`} />)}
        </section>
    )
}

function skeleton() {
    return Array.from({ length: ITEMS_TO_PREVIEW }, (_, idx) => (
        <div key={`g-s-${idx}`} className='image-skeleton'></div>
    ))
}
