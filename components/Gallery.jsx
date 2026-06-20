const Gallery = ({ images }) => {
    return (
        <>
            <h2>Screenshot Gallery</h2>
            {images && images.length > 0 ? (
                <ul className="gallery-grid">
                    {images.map((pic, index) => (
                        <li className="gallery-item" key={index}>
                            <img
                                className="gallery-screenshot"
                                src={pic}
                                alt={`Screenshot ${index + 1}`}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="gallery-empty">
                    No screenshots yet — take one above to get started!
                </div>
            )}
        </>
    );
};

export default Gallery;
