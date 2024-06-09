import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { IoIosNotifications } from "react-icons/io";
import LoadingSpinner from "../../Spinner/LoadingSpinner";

const DashboardNav = () => {
    const { user } = useAuth() || {};
    const axiosSecure = useAxiosSecure();
    const [item, setItems] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationPopupVisible, setNotificationPopupVisible] = useState(false);

    const { data: fetchedItems, } = useQuery(
        {
            queryKey: ["user", user?.email],
            queryFn: async () => {
                const response = await axiosSecure.get(`/users/${user?.email}`);
                return response.data;
            },
        },
    );

    const { data: fetchedNotifications, refetch } = useQuery(
        {
            queryKey: ["notifications", user?.email],
            queryFn: async () => {
                const response = await axiosSecure.get(`/notifications/${user?.email}`);
                return response.data;
            },
        },
    );

    useEffect(() => {
        if (fetchedItems) {
            setItems(fetchedItems);
        }
    }, [fetchedItems]);

    useEffect(() => {
        if (fetchedNotifications) {
            setNotifications(fetchedNotifications);
        }
    }, [fetchedNotifications]);

    const handleNotificationIconClick = () => {
        setNotificationPopupVisible(prev => !prev);
         if (!isNotificationPopupVisible) {
             refetch();  // Refetch notifications when opening the popup
        }
    };

    return (
        <div>
            <header className="p-4 hidden md:block">
                <div className="container flex justify-end h-16 mx-auto">
                    <ul className="items-stretch hidden space-x-3 md:flex gap-4">
                        <li className="flex flex-col gap-4">
                            <div>Role: {item?.role || ""}</div>
                            <div>Available Coins: {item?.coins || ""}</div>
                        </li>
                        <li className="flex flex-col gap-2">
                            <div className="w-10 rounded-full items-center flex justify-center">
                                <img src={item?.image || ""} className="h-full w-full" />
                            </div>
                            <div>{item?.name || "user name not found"}</div>
                        </li>
                        <li className="flex flex-col gap-2 relative">
                            <div>
                                <IoIosNotifications size={32} onClick={handleNotificationIconClick} />
                                {isNotificationPopupVisible && notifications.length > 0 && (
                                    <NotificationPopup notifications={notifications} />
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
};

const NotificationPopup = ({ notifications }) => {
    const [visible, setVisible] = useState(true);

    const handleClick = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (notifications.length > 0) {
            setVisible(true);
        }
    }, [notifications]);

    if (!visible) return null;

    return (
        <div onClick={handleClick} className="fixed top-16  right-16 bg-white p-4 shadow-lg border rounded-lg cursor-pointer">
            {notifications?.map((notification, index) => (
                <div key={index} className="mb-2 z-12">
                    <div className="font-bold">{notification.title}</div>
                    <div>{notification.message}</div>
                </div>
            ))}
        </div>
    );
};

export default DashboardNav;
