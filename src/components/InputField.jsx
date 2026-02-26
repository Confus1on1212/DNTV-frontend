export default function InputField({
    type,
    placeholder,
    isHelperEnabled,
    helperText,
    showPassword
}) {
    if (isHelperEnabled) {
        return(
            <div className="mb-3">
                <input type={showPassword ? {type} : "password"} className="form-control" placeholder={placeholder} />
                <div id="emailHelp" className="form-text text-white-50">{helperText}</div>
            </div>
        )
    } else {
        return(
            <div className="mb-3">
                <input type={showPassword ? {type} : "password"} className="form-control" placeholder={placeholder} />
            </div>
        )
    }
}
