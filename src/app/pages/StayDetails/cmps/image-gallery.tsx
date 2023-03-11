const ITEMS_TO_PREVIEW = 5

export function ImageGallery({ imgUrls = [] }: { imgUrls: string[] | undefined }) {
    if (imgUrls.length < ITEMS_TO_PREVIEW) {
        // fill the array with empty values if there are less than ITEMS_TO_PREVIEW
        imgUrls = [...imgUrls, ...Array(ITEMS_TO_PREVIEW - imgUrls.length).fill(undefined)]
    }

    return (
        <section className='image-gallery'>
            {imgUrls.map((imgUrl, idx) => (
                <div key={`g-i-${idx}`} className={`image-gallery-item-container ${!imgUrl ? 'img-skeleton' : ''}`}>
                    {imgUrl ? <img className='image-gallery-item' src={imgUrl} /> : null}
                </div>
            ))}
        </section>
    )
}
