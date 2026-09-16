import { Mail } from "lucide-react";

const PolicyQuestions = () => {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div
          className="relative overflow-hidden rounded-3xl bg-[#88A6F8] bg-cover bg-center px-5 py-14 text-center sm:px-8 sm:py-16 lg:py-20"
          style={{ backgroundImage: "url('/policy.png')" }}
        >
          <div className="relative z-10 mx-auto max-w-[900px]">
            <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[60px]">
              Questions about these Policys?
            </h2>
            <p className="mx-auto mt-5 max-w-[660px] text-base leading-relaxed text-white sm:text-xl">
              Our legal team is happy to clarify any section before you sign up.
            </p>
            <a
              href="mailto:mordy@noltra.ai"
              className="mx-auto mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-md bg-white px-8 text-base font-semibold text-[#0E1224] shadow-sm"
            >
              <Mail size={19} />
              mordy@noltra.ai
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyQuestions;
