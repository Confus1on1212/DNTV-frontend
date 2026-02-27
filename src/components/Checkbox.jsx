export default function CheckBox({content}) {
    return (
        <div className="mb-3 form-check text-white-50">
            <input type="checkbox" className="form-check-input" id="showPasswordCheck" onClick={() => setShowPassword(!showPassword)} />
            <label className="form-check-label" htmlFor="showPasswordCheck">
              {content}
            </label>
          </div>
    )
}