"use client";
"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import clsx from "clsx";

import useConversation from "@/hooks/useConversation";

import ConversationBox from "./ConversationBox";
import { FullConversationType } from "@/types";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `
    fixed 
    inset-y-0 
    overflow-y-auto
    border-r
    border-gray-200 
    pb-20 
    lg:left-20
    lg:block 
    lg:w-80 
    lg:pb-0 
  `,
        isOpen ? "hidden" : "left-0 block w-full",
      )}
    >
      <div className="px-5">
        <div className="mb-4 flex justify-between pt-4">
          <div className="text-2xl font-bold text-neutral-800">Messages</div>
          <div
            onClick={() => setIsModalOpen(true)}
            className="
            cursor-pointer 
            rounded-full 
            bg-gray-100 
            p-2 
            text-gray-600 
            transition 
            hover:opacity-75
          "
          >
            <MdOutlineGroupAdd size={20} />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList;
