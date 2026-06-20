const fieldConfig = {
    url: {
        label: "Website URL",
        placeholder: "google.com",
        hint: "Do not include https://",
    },
    format: {
        label: "Image Format",
        placeholder: "jpeg, png, or webp",
    },
    no_ads: {
        label: "Remove Ads",
        placeholder: "true or false",
    },
    no_cookie_banners: {
        label: "Remove Banners",
        placeholder: "true or false",
    },
    width: {
        label: "Width (px)",
        placeholder: "1920",
    },
    height: {
        label: "Height (px)",
        placeholder: "1080",
    },
};

const APIForm = ({ inputs, handleChange, onSubmit }) => {
    return (
        <div className="form-card">
            <div className="form-card-header">
                <h2>Screenshot Options</h2>
                <p>All fields are optional except the URL.</p>
            </div>

            <div className="form-fields">
                {Object.entries(inputs).map(([key, value]) => {
                    const config = fieldConfig[key] || { label: key, placeholder: "" };
                    return (
                        <div className="form-row" key={key}>
                            <label className="field-label">{config.label}</label>
                            <div className="field-right">
                                <input
                                    type="text"
                                    name={key}
                                    value={value}
                                    placeholder={config.placeholder}
                                    onChange={handleChange}
                                    className="textbox"
                                />
                                {config.hint && (
                                    <p className="field-hint">{config.hint}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="form-card-footer">
                <span className="submit-note">Defaults applied for empty fields</span>
                <button className="submit-btn" onClick={onSubmit}>
                    Take Screenshot →
                </button>
            </div>
        </div>
    );
};

export default APIForm;
