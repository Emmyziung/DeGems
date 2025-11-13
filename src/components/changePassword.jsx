import { useState, useEffect } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useAuthContext } from "../context/AuthContext";

export default function ChangePassword() {
  const { currentUser, auth } = useAuthContext();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [requirements, setRequirements] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // password strength validation
  useEffect(() => {
    const pw = newPassword;
    setRequirements({
      length: pw.length >= 8,
      upper: /[A-Z]/.test(pw),
      lower: /[a-z]/.test(pw),
      number: /[0-9]/.test(pw),
      special: /[^A-Za-z0-9]/.test(pw),
    });
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (!currentUser) {
      setErrors({ general: "No authenticated user" });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrors({ confirm: "Passwords do not match" });
      return;
    }
    const valid =
      requirements.length &&
      requirements.upper &&
      requirements.lower &&
      requirements.number &&
      requirements.special;
    if (!valid) {
      setErrors({ strength: "Password does not meet requirements" });
      return;
    }

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      oldPassword
    );

    try {
      setLoading(true);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setErrors({ old: "Incorrect current password" });
      } else if (err.code === "auth/requires-recent-login") {
        setErrors({
          reauth:
            "Session too old. Please log in again or reset password using email.",
        });
      } else {
        setErrors({ general: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!currentUser?.email) return;
    try {
      await sendPasswordResetEmail(auth, currentUser.email);
      setErrors({ reset: "Password reset email sent." });
    } catch (err) {
      setErrors({ reset: err.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-2xl shadow"
    >
      <div>
        <label className="block text-sm font-medium">Current Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {errors.old && <p className="text-red-500 text-sm">{errors.old}</p>}
        {errors.reauth && (
          <div className="text-red-500 text-sm">
            {errors.reauth}{" "}
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-600 underline"
            >
              Forgot password?
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Confirm New Password</label>
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}
      </div>

      <div className="text-sm space-y-1">
        <p className={requirements.length ? "text-green-500" : "text-red-500"}> At least 8 characters
        </p>
     
        <p className={requirements.upper ? "text-green-500" : "text-red-500"}> One uppercase letter
        </p>
        <p className={requirements.lower ? "text-green-500" : "text-red-500"}> One lowercase letter
        </p>
        <p className={requirements.number ? "text-green-500" : "text-red-500"}> One number
        </p>
        <p className={requirements.special ?  "text-green-500" : "text-red-500"}> One special character
        </p>
      </div>

      {errors.strength && (
        <p className="text-red-500 text-sm">{errors.strength}</p>
      )}
      {errors.general && (
        <p className="text-red-500 text-sm">{errors.general}</p>
      )}
      {errors.reset && (
        <p className="text-green-600 text-sm">{errors.reset}</p>
      )}
      {success && <p className="text-green-600 text-sm">Password updated successfully.</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}
