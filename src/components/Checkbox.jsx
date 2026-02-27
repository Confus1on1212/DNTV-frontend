import '../style/main.css'

export default function CheckBox({content, setShowPassword}) {
    return (
        <div className="mb-3 form-check text-custom-blue">
            <input type="checkbox" className="form-check-input" id="showPasswordCheck" onClick={() => setShowPassword(!showPassword)} />
            <label className="form-check-label" htmlFor="showPasswordCheck">
              {content}
            </label>
          </div>
    )
}