import { Button, Typography } from "antd";

const { Title, Paragraph } = Typography;

export const WelcomeSection = ({ onShowSeating }) => {
  return (
    <section className="relative z-10 mx-auto my-auto flex w-full max-w-2xl flex-col items-center rounded-3xl bg-white p-8 text-center shadow-xl">
      <p className="text-sm uppercase tracking-[0.25em] text-rose-400">Wedding Day</p>
      <Title level={1} className="!mt-4 !mb-0 !text-3xl !text-slate-900 md:!text-4xl">
        Добро пожаловать, дорогие гости!
      </Title>
      <Paragraph className="!mt-4 !mb-0 !text-base !text-slate-600 md:!text-lg">
        Нажмите на кнопку, чтобы найти свое место и посмотреть рассадку столиков.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        className="!mt-8 !h-auto !rounded-full !bg-rose-500 !px-7 !py-3 !font-semibold hover:!bg-rose-600"
        onClick={onShowSeating}
      >
        Look мои места
      </Button>
    </section>
  );
};
