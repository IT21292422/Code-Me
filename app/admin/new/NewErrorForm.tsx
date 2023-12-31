"use client"

import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import 'firebase/compat/firestore';
import firestore from "../../../config/firebase_cs";
import { useRouter } from 'next/navigation';



function NewErrorForm(){
	const [errorId, setErrorId] = useState('');
	const [description, setDescription] = useState('');
	const [isSaving, setIsSaving] = useState(false);
	const route = useRouter();

	const docRef = firestore.collection('error-explanations');

	// create new error
	const save = async(event: React.SyntheticEvent) => {
		event.preventDefault();
		setIsSaving(true);
		const savingToast = toast.loading('Saving...', {style:{minWidth: '250px'}});
		try {
			// create new document
			await docRef.doc(errorId).set({
				name: errorId,
				description: description
			});

			// clear the input fields
			setErrorId('');
			setDescription('');

			// success message
			toast.success('New Error added', {id: savingToast, style:{minWidth: '250px'}});
		} catch (error) {
			console.error(error);
			toast.error('something went wrong 🙁', {id: savingToast, style:{minWidth: '250px'}});
		} finally {
			setIsSaving(false);
		}
	}

	return(
		<div className="2xl:container 2xl:mx-auto m-7">
			<Toaster />
			<br />
			<form action="" method="post" className="form-control w-full max-w-[100%]" onSubmit={save}>
				{/* error name/ID */}
				<label htmlFor="errorName" className="label label-text">Error name (ID): </label>
				<input type="text" name="errorName" id="errorName" 
				className="input input-bordered w-full max-w-[100%]"
				value={errorId} onChange={(e) => setErrorId(e.target.value)} disabled={isSaving} /> <br />

				{/* error description */}
				<label htmlFor="description" className="label label-text">Description </label>
				<textarea name="description" id="description" 
				className="textarea textarea-bordered textarea-lg w-full max-w-[100%] h-96 text-base"
				value={description} onChange={(e) => setDescription(e.target.value)} disabled={isSaving} >
				</textarea> <br />

				{/* buttons */}
				<div className="flex space-x-4 justify-end items-center">
					<button className="btn btn-accent w-28" type='submit' disabled={isSaving}>
						Save
					</button>
					<button className="btn btn-outline btn-error w-28" 
					onClick={(e) => { e.preventDefault(); route.push('/admin') }} disabled={isSaving} >
						Back
					</button>
				</div>
			</form>
		</div>
	);
}

export default NewErrorForm;