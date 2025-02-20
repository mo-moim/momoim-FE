"use client";

import { useLike } from "@/queries/wishlist/useLike";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { toast } from "@/hooks/use-toast";

interface Props {
  gatheringId: number;
  isWishlist: boolean | undefined;
}

export default function Heart({ gatheringId, isWishlist }: Props) {
  const { mutate: liketask } = useLike();
  return (
    <motion.div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!Cookies.get("accessToken")) {
          toast({
            title: "비로그인 상태",
            description: "찜하기는 로그인 후 가능합니다!",
            duration: 2000,
          });
        } else {
          if (!isWishlist) liketask({ id: gatheringId, isLike: true });
          if (isWishlist) liketask({ id: gatheringId, isLike: false });
        }
      }}
      initial={false}
      animate={{ scale: isWishlist ? 1.1 : 1, rotate: isWishlist ? 360 : 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-1 -1 22 20"
        className={`h-5 w-5 ${isWishlist ? "fill-main stroke-transparent" : "fill-transparent stroke-gray-700"}`}
      >
        <motion.path
          d="M10.478 1.21961C10.416 1.27732 10.355 1.33708 10.2954 1.39889L9.33713 2.39392L8.37889 1.39889C8.31914 1.33715 8.25816 1.27746 8.19604 1.21982C6.38185 -0.4636 3.59323 -0.403911 1.85265 1.39889C0.0478147 3.26341 0.0478147 6.28572 1.85265 8.1549L2.81089 9.14993L8.74867 15.2968C9.07032 15.6297 9.60394 15.6297 9.92559 15.2968L15.8634 9.14993L16.8216 8.1549C18.6218 6.29037 18.6218 3.26341 16.8216 1.39889C15.0811 -0.403836 12.2883 -0.463595 10.478 1.21961Z"
          stroke="currentColor"
          strokeWidth="2"
          className={`${isWishlist ? "stroke-transparent" : "stroke-gray-700"}`}
        />
        <motion.path
          d="M10.478 1.21961C10.416 1.27732 10.355 1.33708 10.2954 1.39889L9.33713 2.39392L8.37889 1.39889C8.31914 1.33715 8.25816 1.27746 8.19604 1.21982C6.38185 -0.4636 3.59323 -0.403911 1.85265 1.39889C0.0478147 3.26341 0.0478147 6.28572 1.85265 8.1549L2.81089 9.14993L8.74867 15.2968C9.07032 15.6297 9.60394 15.6297 9.92559 15.2968L15.8634 9.14993L16.8216 8.1549C18.6218 6.29037 18.6218 3.26341 16.8216 1.39889C15.0811 -0.403836 12.2883 -0.463595 10.478 1.21961Z"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isWishlist ? 1 : 0,
            opacity: isWishlist ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="fill-main"
        />
      </motion.svg>
    </motion.div>
  );
}
