import Calendar from '@/components/Calendar'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[960px] mx-auto bg-white rounded-[28px] shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row border border-gray-100">
        
        <div className="w-full md:w-5/12 min-h-[260px] relative bg-stone-50 border-b md:border-b-0 md:border-r border-gray-100/60 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" 
            alt="Office vibes" 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        </div>

        <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col">
          <Calendar />
        </div>
        
      </div>
    </main>
  )
}
