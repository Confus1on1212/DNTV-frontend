export default function InputField({
    type,
    placeholder,
    isHelperEnabled,
    helperText,
    showPassword,
    setValue,
    value
}) {
    if (isHelperEnabled) {
        return(
            <div className="mb-3">
                <input type={showPassword ? {type} : "password"} className="form-control" placeholder={placeholder} value={value}
                onChange={(e) => setValue(e.target.value)}/>
                <div id="emailHelp" className="form-text text-white-50">{helperText}</div>
            </div>
        )
    } else {
        return(
            <div className="mb-3">
                <input type={showPassword ? {type} : "password"} className="form-control" placeholder={placeholder} value={value}
                onChange={(e) => setValue(e.target.value)}/>
            </div>
        )
    }
}
