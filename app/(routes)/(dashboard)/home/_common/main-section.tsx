import { RiEmotionHappyFill } from "@remixicon/react"
import Header from "../../_common/header"

function MainSection() {
  return (
    <>
      <Header />
      <div className="relative w-full">
        <div className="mx-auto w-full max-w-2xl space-y-5">
          <div className="mt-16 flex w-full items-center justify-center">
            <h1 className="fade-in-up z-0 flex items-center gap-2 text-center text-[24px] font-semibold tracking-tighter text-pretty text-gray-800 opacity-0 [animation-delay:200ms] sm:text-[30px] md:text-[35px] dark:text-white">
              <RiEmotionHappyFill className="size-6 md:size-10 lg:mt-2" />
              How can I help you today?
            </h1>
          </div>
          <div className="w-full pt-7">
            <div className="w-full">
              <span className="text-sm dark:text-white/50">Recent notes</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainSection
