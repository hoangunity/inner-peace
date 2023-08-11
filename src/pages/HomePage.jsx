import Headphone from "../assets/images/Headphone.png";

function HomePage() {
  return (
    // CONTAINER
    <div className="bg-slate-100 w-full h-full bg-hero-pattern">
      {/* Slogan */}
      <div>
        <div className="pt-4 pb-2 flex flex-col gap-2">
          <p className="font-bold text-4xl text-center tracking-wide text-red-200">
            Find <span className="text-purple-300">Peace</span> Within
          </p>
          <p className="font-bold text-3xl text-center tracking-wide text-rose-300">
            Anytime
          </p>
          <p className="font-bold text-3xl text-center tracking-wide text-rose-300">
            Anywhere
          </p>
        </div>
        {/* Images */}
        <div className="flex justify-center">
          <div>
            <img src={Headphone} alt="Headphone" height={300} width={300} />
          </div>
        </div>
        s
      </div>
    </div>
  );
}

export default HomePage;
