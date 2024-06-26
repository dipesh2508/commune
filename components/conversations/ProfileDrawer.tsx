"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import { IoTrash } from "react-icons/io5";
import Avatar from "../Avatar";
import Modal from "../shared/Modal";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "../AvatarGroup";
import useActiveList from "@/hooks/useActiveList";

interface IProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}
const ProfileDrawer: React.FC<IProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const {members} = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const joinDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const groupCreated = useMemo(() => {
    return format(new Date(data.createdAt), "PP");
  }, [data.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive? "Active": "Offline";
  }, [data, isActive]);
  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:ease-out"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:ease-in"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <HiX className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 px-4 sm:px-6">
                        <div className="flex flex-col items-center gap-3">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <div>{title}</div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>
                          <div className="my-8 flex gap-10">
                            <div
                              className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75"
                              onClick={() => setConfirmOpen(true)}
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                                <IoTrash size={20} />
                              </div>
                              <div className="text-sm font-light text-neutral-600">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                            {data.isGroup && (
                                <>
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Group Chat Created
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      <time dateTime={groupCreated}>
                                        {groupCreated}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                              {data.isGroup && (
                                <div>
                                  <hr />
                                  <dt className="text-sm font-medium mt-4 text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Members
                                  </dt>
                                  <dd className="mt-3 text-sm flex flex-col gap-2 text-gray-900 sm:col-span-2">
                                    {data.users.map((user) => 
                                    (
                                      <div key={user.id} className="flex items-center gap-2">
                                        <div className="flex items-center justify-center">

                                        <Avatar user={user} />
                                        </div>
                                        <div className="flex flex-col">


                                        <div className="text-base font-medium">{user.name}</div>
                                        <div className="text-xs">{user.email}</div>
                                        </div>
                                      </div>
                                    )
                                    )}
                                  </dd>
                                </div>
                                
                              )}
                              {!data.isGroup && (
                                <div className="">
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                    Email
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      <time dateTime={joinDate}>
                                        {joinDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
