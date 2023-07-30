import { useForm } from "react-hook-form";

function RegisterSessionForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <form
        className="border flex-row space-y-4 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* MEDITATION REASON */}
        <div className="flex flex-col gap-1">
          <span className="font-semibold">Choose your session?</span>
          <div className="flex flex-row gap-3 h-max ">
            <div className="flex flex-row gap-3">
              <input
                {...register("reason")}
                type="radio"
                id="sleep"
                value="sleep"
              />
              <label htmlFor="sleep">Sleep</label>
            </div>
            <div className="flex flex-row gap-3">
              <input
                {...register("reason")}
                type="radio"
                id="stress"
                value="stress"
              />
              <label htmlFor="stress">Stress</label>
            </div>
            <div className="flex flex-row gap-3">
              <input
                {...register("reason")}
                type="radio"
                id="mindfulness"
                value="mindfulness"
              />
              <label htmlFor="mindfulness">Mindfulness</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold">How much time do you have?</span>
          <div className="flex flex-col gap-3 h-max">
            <div className="flex flex-row gap-3">
              <input {...register("time")} type="radio" id="5min" value="5" />
              <label htmlFor="5min">5 minutes</label>
            </div>
            <div className="flex flex-row gap-3">
              <input {...register("time")} type="radio" id="10min" value="10" />
              <label htmlFor="10min">10 minutes</label>
            </div>
            {/* <div className="flex flex-row gap-3">
                <label htmlFor="others">Others</label>
                <input
                  {...register("time", {
                    min: {
                      value: 5,
                      message: "Minimum 5 minutes",
                    },
                    max: {
                      value: 30,
                      message: "Maximum 30 minutes",
                    },
                  })}
                  type="number"
                  id="others"
                />
              </div> */}
          </div>
        </div>
      </form>
    </>
  );
}

export default RegisterSessionForm;
