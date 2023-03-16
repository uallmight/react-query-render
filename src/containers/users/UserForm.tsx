import React, { useState, useCallback } from "react";
import SpinnerLoader from "../../components/loaders/spinner";
import { useCreateUserMutation } from "../../hooks/users/mutations";
import { useQueryClient } from "react-query";

const AddUserForm = () => {
  const queryClient = useQueryClient();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const createUser = useCreateUserMutation();

  const handleSubmit = useCallback(
    () => async (e: React.FormEvent<HTMLFormElement>) => {
      if (!email || !username || !password) {
        return;
      }
      e.preventDefault();
      setIsSubmitting(true);
      try {
        await createUser.mutateAsync({ email, password, username });
        await queryClient.invalidateQueries(["users"]);
        setUsername("");
        setEmail("");
        setPassword("");
      } finally {
        setIsSubmitting(false);
      }
    },
    [username, email, password, createUser, queryClient]
  );

  return (
    <SpinnerLoader loading={isSubmitting}>
      <div>
        <h2 className="text-lg font-bold">Create User Form</h2>
        <form onSubmit={handleSubmit()} className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label id="username-label" className="font-bold">Username<span className="text-red-500">*</span></label>
            <div className="flex flex-col">
              <input
                className="border-stone-700 border-x border-y rounded focus:border-cyan-400 focus:shadow-none"
                required
                aria-labelledby="username-label"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
              <span id="username-required-label" className="text-red-500">Username is required</span>
            </div>
          </div>
          <div className="flex flex-col">
            <label id="email-label" className="font-bold">E-Mail<span className="text-red-500">*</span></label>
            <div className="flex flex-col">
              <input
                className="border-stone-700 border-x border-y rounded focus:border-cyan-400 focus:shadow-none"
                required
                aria-labelledby="email-label"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <span id="email-required-label" className="text-red-500">Email is requried</span>
              <span id="email-duplicate-label" className="text-red-500">Email already exists</span>
            </div>
          </div>
          <div className="flex flex-col">
            <label id="password-label" className="font-bold">Password<span className="text-red-500">*</span></label>
            <div className="flex flex-col">
              <input
                className="border-stone-700 border-x border-y rounded focus:border-cyan-400 focus:shadow-none"
                required
                aria-labelledby="password-label"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <span id="password-required-label" className="text-red-500">Password is requried</span>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            {isSubmitting ? (
              <p>Saving...</p>
            ) : (
              <>
                <button type="button" disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </SpinnerLoader>
  );
};

export default AddUserForm;
