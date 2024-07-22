import News from "./News";
export default function NewsApp(){
    return(
        <div>
              <div className="bg-orange-300 h-[1200px] w-full flex">
        <div className="text-white text-4xl font-bold text-center p-4 shadow-bg ml-[7%]">
          💡 Creative Ideas to Inspire Your Post more effective
          <div className="overflow-y-auto flex-grow h-[1000px] mt-8 scroll-hidden">
          <News />
          </div>

        </div>
      </div>
        </div>
    )
}