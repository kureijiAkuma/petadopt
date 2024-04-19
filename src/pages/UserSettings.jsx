import { useState, useEffect } from 'react';
import Navbar from '../templates/Navbar';
import { auth, DB } from '../firebase';
import { deleteDoc, doc } from "firebase/firestore";
export default function UserSettings() {
    const [newDisplayName, setNewDisplayName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleChangeDisplayName = () => {
        if (!user) {
            console.error('No user is currently signed in or user object is not properly initialized');
            setErrorMessage('No user is currently signed in or user object is not properly initialized');
            return;
        }

        if (typeof user.updateProfile === 'function') {
            user.updateProfile({
                displayName: newDisplayName
            }).then(() => {
                console.log('Display name updated successfully');
                setNewDisplayName('');
            }).catch((error) => {
                console.error('Error updating display name:', error);
                setErrorMessage('Error updating display name');
            });
        } else {
            console.error('User object does not have updateProfile method');
            setErrorMessage('User object does not have updateProfile method');
        }
    };

    const handleChangePassword = () => {
        if (!user) {
            console.error('No user is currently signed in or user object is not properly initialized');
            setErrorMessage('No user is currently signed in or user object is not properly initialized');
            return;
        }

        if (typeof user.updatePassword === 'function') {
            user.updatePassword(newPassword)
                .then(() => {
                    console.log('Password updated successfully');
                    setNewPassword('');
                })
                .catch((error) => {
                    console.error('Error updating password:', error);
                    setErrorMessage('Error updating password');
                });
        } else {
            console.error('User object does not have updatePassword method');
            setErrorMessage('User object does not have updatePassword method');
        }
    };
    const handleDeleteUser = async () => {
        if (!user) {
            console.error('No user is currently signed in or user object is not properly initialized');
            setErrorMessage('No user is currently signed in or user object is not properly initialized');
            return;
        }

        await deleteDoc(doc(DB, "users", user.uid));
    
        user.delete()
            .then(() => {
                console.log('User deleted successfully');
                localStorage.removeItem('email');
                // Log out the user after deletion
                auth.signOut().then(() => {
                    // Redirect to sign-in page or any other desired action
                    history.push('/signin');
                }).catch((error) => {
                    console.error('Error signing out user after deletion:', error);
                });
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                setErrorMessage('Error deleting user');
            });
    };

    return (
        <div className="flex flex-col justify-start items-center">
            <Navbar />
            <div className="flex flex-col justify-center h-screen w-3/5 pt-20 p-28 bg-blue-gray-700">
                <h1>Change Name</h1>
                <input
                    type="text"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                />
                {user && typeof user.updateProfile === 'function' && (
                    <button onClick={handleChangeDisplayName}>Update Display Name</button>
                )}
                <h1>Change Password</h1>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                {user && typeof user.updatePassword === 'function' && (
                    <button onClick={handleChangePassword}>Update Password</button>
                )}
                {user && (
                    <button onClick={handleDeleteUser}>Delete Account</button>
                )}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
}
