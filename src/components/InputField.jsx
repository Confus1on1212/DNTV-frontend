export default function InputField({type, placeholder, isHelperEnabled, helperText, showPassword, setValue, value }) {
    return(
        <div className="mb-3">
            <input type={showPassword ? {type} : "password"} className="form-control" placeholder={placeholder} value={value}
            onChange={(e) => setValue(e.target.value)}/>

            {isHelperEnabled && <div id="emailHelp" className="form-text text-custom-blue">{helperText}</div>}
        </div>
    )
}
