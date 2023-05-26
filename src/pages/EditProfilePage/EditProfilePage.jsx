import "./EditProfilePage.css"

import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { LanguageContext } from "../../context/lang.context" 

import Loading from "../../components/Loading/Loading";
import ProfilePictureInput from "../../components/ProfilePictureInput/ProfilePictureInput";

function EditProfilePage() {
	
	const { user, changePassword, errorMessage, changePFP } = useContext(AuthContext)
	const [currentPassword, setCurrentPassword] = useState(null)
	const [newPassword, setNewPassword] = useState(null)
    const { language } = useContext(LanguageContext)

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

				{language === "EN" && <div className="changePasswordDiv">	
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
				</div>}
				{language === "FR" && <div className="changePasswordDiv">	
					<form className="changePasswordForm" onSubmit={handleSubmit}>
						<div>
							<label>Votre mot de passe</label>
							<input type="password" name="currentPassword" placeholder="Ne donner jamais votre mot de passe !" onChange={handleChangeCurrent}/>
						</div>
						<div>
							<label>Nouveau mot de passe</label>
							<input type="password" name="newPassword" placeholder="Il faut chosir un mot de passe fort" onChange={handleChangeNew}/>
						</div>
						<div>
							<label>Repeter le mot de passe</label>
							<input type="password" name="repeatNewPassword" placeholder="Les mots de passes doivent correspondre"/>
						</div>
						<button className="changePasswordButton" type="submit">Changer le mot de passe</button>
					</form>

					{errorMessage && <p className={errorMessage === "Password was succesfully changed." ? "success-message" : "error-message"}>{errorMessage}</p>}
				</div>}
				{language === "ES" && <div className="changePasswordDiv">	
					<form className="changePasswordForm" onSubmit={handleSubmit}>
						<div>
							<label>Cotraseña actual</label>
							<input type="password" name="currentPassword" placeholder="Nunca le des tu contraseña a nadie" onChange={handleChangeCurrent}/>
						</div>
						<div>
							<label>Nueva contraseña</label>
							<input type="password" name="newPassword" placeholder="Asegurate de escoger una constraseña segura" onChange={handleChangeNew}/>
						</div>
						<div>
							<label>Repetir contraseña</label>
							<input type="password" name="repeatNewPassword" placeholder="Las contraseñas deben de ser iguales"/>
						</div>
						<button className="changePasswordButton" type="submit">Cambiar contraseña</button>
					</form>

					{errorMessage && <p className={errorMessage === "La contraseña fue cambiada exitosamente." ? "success-message" : "error-message"}>{errorMessage}</p>}
				</div>}
			
			</div>
		</div>
	)
}

export default EditProfilePage