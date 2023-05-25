import "./EditProfilePage.css"

import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

import Loading from "../../components/Loading/Loading";
import ProfilePictureInput from "../../components/ProfilePictureInput/ProfilePictureInput";

function EditProfilePage() {
	
	const { user, changePassword, errorMessage, changePFP } = useContext(AuthContext)
	const [currentPassword, setCurrentPassword] = useState(null)
	const [newPassword, setNewPassword] = useState(null)

	function handleChangeCurrent(e) {
		setCurrentPassword(e.target.value)
	}

	function handleChangeNew(e) {
		setNewPassword(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault()
		const requestBody = { currentPassword, newPassword, user }
		changePassword(requestBody)
	}
	
	return (
		<div className="editProfilePageDiv">
			<div className="editProfilePageWrapper">
				
				<div className="changeProfilePicDiv">
					{user ?

					<ProfilePictureInput user={user} changePFP={changePFP}/> //Click on PFP

					:

					<Loading />
					
					}
				</div>

				<div className="changePasswordDiv">	
					<form className="changePasswordForm" onSubmit={handleSubmit}>
						<div>
							<label>Current password</label>
							<input type="password" name="currentPassword" placeholder="Never give out your password to anyone" onChange={handleChangeCurrent}/>
						</div>
						<div>
							<label>New password</label>
							<input type="password" name="newPassword" placeholder="Be sure to choose a strong password" onChange={handleChangeNew}/>
						</div>
						<div>
							<label>Repeat password</label>
							<input type="password" name="repeatNewPassword" placeholder="The passwords must match"/>
						</div>
						<button className="changePasswordButton" type="submit">Change password</button>
					</form>

					{errorMessage && <p className={errorMessage === "Password was succesfully changed." ? "success-message" : "error-message"}>{errorMessage}</p>}
				</div>		
			
			</div>
		</div>
	)
}

export default EditProfilePage