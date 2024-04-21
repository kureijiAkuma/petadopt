import React, { useState, useEffect } from 'react';
import Navbar from '../templates/Navbar';
import { auth, DB } from '../firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { Input, Typography } from '@material-tailwind/react';
import { message } from 'antd';
import phil from 'phil-reg-prov-mun-brgy';

export default function UserSettings() {
    const [newDisplayName, setNewDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);
    const [lastDisplayNameChangeTime, setLastDisplayNameChangeTime] = useState(0);
    const [barangays, setBarangays] = useState([]);
    const [selectedBarangay, setSelectedBarangay] = useState("Select a Barangay"); // Set default value to "Select a Barangay"

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                loadLastDisplayNameChangeTime(user.uid);
            }
        });

        const fetchBarangays = async () => {
            try {
                const barangayList = phil.getBarangayByMun("097332");
                setBarangays(barangayList);
            } catch (error) {
                console.error('Error fetching barangays:', error);
            }
        };

        fetchBarangays();

        return () => unsubscribe();
    }, []);

    const loadLastDisplayNameChangeTime = async (userId) => {
        try {
            const docRef = doc(DB, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.lastDisplayNameChangeTime) {
                    setLastDisplayNameChangeTime(data.lastDisplayNameChangeTime);
                }
            }
        } catch (error) {
            console.error('Error loading last display name change time:', error);
        }
    };

    const handleSubmit = async () => {
        if (!user) {
            console.error('No user is currently signed in or user object is not properly initialized');
            setErrorMessage('No user is currently signed in or user object is not properly initialized');
            return;
        }

        // Check if any input fields (except the select box) have values
        if (newDisplayName !== "" || selectedBarangay !== "Select a Barangay") {
            // Fetch existing user data from the database
            let existingUserData;
            try {
                const docRef = doc(DB, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    existingUserData = docSnap.data();
                }
            } catch (error) {
                console.error('Error fetching existing user data:', error);
                setErrorMessage('Error fetching existing user data');
                return;
            }

            // Merge existing user data with new data to be saved
            const userData = {
                uid: user.uid,
                ...existingUserData // Merge existing user data
            };

            // Update new data only if the values are not empty
            if (newDisplayName !== "") {
                userData.username = newDisplayName;
            }

            if (selectedBarangay !== "Select a Barangay") {
                userData.barangay = selectedBarangay;
            }

            try {
                // Save merged user data to the database
                await setDoc(doc(DB, "users", user.uid), userData);

                message.success('Values saved successfully.');
                setNewDisplayName('');
                setSelectedBarangay('Select a Barangay');

                // Update the last display name change time only if the display name is changed
                if (newDisplayName !== "") {
                    const currentTime = Date.now();
                    setLastDisplayNameChangeTime(currentTime);
                    await setDoc(doc(DB, "users", user.uid), { lastDisplayNameChangeTime: currentTime }, { merge: true });
                }
            } catch (error) {
                console.error('Error saving values to the database:', error);
                setErrorMessage('Error saving values to the database');
            }
        } else {
            // Display an error message if no input fields have values
            message.error('Please enter at least one value to save.');
        }
    };



    return (
        <div className="flex flex-col justify-start items-center">
            <Navbar />
            <div className="flex flex-col justify-center h-screen w-3/5 pt-20 p-20 bg-white gap-4">
                <h1 className='font-Roboto font-semibold text-xl'>Settings</h1>
                <div>
                    <Input variant="outlined" label="Change Username" placeholder="Outlined" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} />
                </div>


                <div className="relative">
                    <span className="absolute start-3 bottom-3 text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                            <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                        </svg>
                    </span>
                    <input
                        type="tel"
                        id="phone-input"
                        className="placeholder-blue-gray-500 h-full w-full pl-8 rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:!bg-gray-200 focus:border-2  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        pattern="[0-9]{11}"
                        maxLength="11"
                        placeholder="09975342236"
                    />
                    <label for="floating-phone-number" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Phone number</label>
                </div>


                <div>
                    <select
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200  empty:!bg-gray-900 focus:border-2  focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        value={selectedBarangay}
                        onChange={(e) => setSelectedBarangay(e.target.value)}
                    >
                        <option disabled>Select a Barangay</option>
                        {barangays.map(barangay => (
                            <option key={barangay.code} value={barangay.name}>{barangay.name}</option>
                        ))}
                    </select>
                </div>

                <button onClick={handleSubmit}>Update Changes</button>

                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
}
