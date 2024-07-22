import React, { useState } from "react";
import "./Verify.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const [verificationCode, setVerificationCode] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
             // Extract the oobCode from the verification link
            let tmp1 = verificationCode.split("oobCode=")[1];// Get the part after 'oobCode='
            let tmp2 = tmp1.split("&apiKey=")[0];// Get the part before '&apiKey='

             // Send the oobCode to the Firebase API to verify the email
            const resp = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAtT2tM0vyvpVl3YO-igDVgDCOb4fdcCGQ`,
                {
                    oobCode: tmp2,
                }   
            );
            //property firebase api in boolean
            if (resp.data.emailVerified === true) {
                navigate("/home", { replace: true });
            }
        } catch (error) {
            console.error("Verification error:", error);
            window.alert("Please enter a valid verification link.");
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={submitHandler}>
                <h2 className="verify">Verify your email</h2>
                <h3 className="paste">Paste the verification link from your email below.</h3>

                <div className="inpBox">
                    <label className="label" htmlFor="verificationCode">
                        Verification link
                    </label>
                    <input
                        className="input"
                        id="verificationCode"
                        type="text"
                        placeholder="Enter verification link"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        className="btn-submit"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Verify;
