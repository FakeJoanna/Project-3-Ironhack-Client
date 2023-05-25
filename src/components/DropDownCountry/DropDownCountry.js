import React from 'react'


const DropDownCountry = () => {
  return (
    <div>
<select name="country" id="country">
  <option value="" selected disabled>Select your country</option>
  <option value="AF"><span className="flag-icon-background flag-icon-af"></span>Afghanistan</option>
  <option value="AL"><span className="flag-icon-background flag-icon-al"></span>Albania</option>
  <option value="DZ"><span className="flag-icon-background flag-icon-dz"></span>Algeria</option>
  ...
</select>
    </div>
  )
}

export default DropDownCountry