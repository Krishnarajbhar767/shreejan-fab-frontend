import { useEffect } from "react";
import Heading from "../../pages/public/home/components/Heading";
import { AnimatePresence, motion } from "framer-motion";
import InputField from "./InputField";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { Link } from "react-router-dom";

const LoginSidebar = ({ isOpen, closeHandler }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    useEffect(() => {
        // Calculate scrollbar width
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        // Lock scroll + hide scrollbar
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        // Prevent layout shift (compensate scrollbar width)
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            // Restore everything
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);

    const emailValue = watch("email");
    const passwordValue = watch("password");

    return (
        <div
            className="fixed z-[100] inset-0 w-screen h-screen flex bg-gray-900/25"
            onClick={closeHandler}
        >
            <motion.div
                className="absolute flex flex-col bg-white w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-full right-0 z-[101]"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center w-full px-4 sm:px-6 py-4">
                    <Heading text="Login" />
                    <button
                        onClick={closeHandler}
                        className="p-2"
                        aria-label="Close login"
                    >
                        <svg
                            className="w-5 h-5 text-gray-800 hover:text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                        </svg>
                    </button>
                </div>
                <hr className="border-gray-300 mx-4 sm:mx-6" />

                {/* Form Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
                    <form
                        className="flex flex-col gap-2 mt-3"
                        onSubmit={handleSubmit(
                            (data) => alert(JSON.stringify(data)),
                            (err) => console.log(err)
                        )}
                    >
                        <InputField
                            register={register}
                            name="email"
                            type="email"
                            label="Email Or Username*"
                            errors={errors}
                            value={emailValue}
                            rules={{
                                required: "Email is required.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message:
                                        "Please enter a valid email address",
                                },
                            }}
                            className="text-sm sm:text-base"
                        />
                        <InputField
                            register={register}
                            name="password"
                            type="password"
                            label="Password*"
                            errors={errors}
                            value={passwordValue}
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                                maxLength: {
                                    value: 20,
                                    message:
                                        "Password must not exceed 20 characters",
                                },
                            }}
                            className="text-sm sm:text-base"
                        />
                        <div className="flex justify-between items-center text-gray-800 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="remember_me"
                                    className="h-4 w-4"
                                />
                                <label
                                    htmlFor="remember_me"
                                    className="text-xs sm:text-sm"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                to="/reset-password"
                                onClick={closeHandler}
                                className="text-xs sm:text-sm underline hover:text-gray-600"
                            >
                                Lost Password?
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Footer (Fixed to Bottom) */}
                <div className="sticky bottom-0 bg-white border-t border-gray-300 px-4 sm:px-6 py-4">
                    <Button
                        text="Login"
                        type="submit"
                        className="w-full py-2 text-sm sm:text-base rounded"
                        onClick={handleSubmit(
                            (data) => alert(JSON.stringify(data)),
                            (err) => console.log(err)
                        )}
                    />
                    <div className="mt-3 text-center">
                        <p className="text-gray-600 text-xs sm:text-sm">
                            No account yet?{" "}
                            <Link
                                to="/sign-up"
                                onClick={closeHandler}
                                className="text-xs sm:text-sm underline hover:text-gray-600"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginSidebar;
