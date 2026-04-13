import { Button, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import restaurantImage from "../../../shared/assets/images/restaurant.png";
const { Title, Paragraph } = Typography;
export const WelcomeSection = ({ onShowSeating, t }) => {
  return (
    <section
      className="relative z-10 mx-auto my-auto flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-3xl p-8 text-center shadow-xl backdrop-blur-sm"
      style={{
        backgroundImage: `url(${restaurantImage})`,
        backgroundSize: "contain",
        backgroundPosition: "left",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/85" />
      <p className="relative text-sm uppercase tracking-[0.25em] text-rose-400">
        {t.weddingDay}
      </p>
      <p className="relative text-[12px] uppercase tracking-[0.25em] text-rose-400">
        26.04.26
      </p>
      <Title
        level={1}
        className="relative !mt-4 !mb-0 !text-3xl !text-slate-900 md:!text-4xl"
      >
        <span className="inline-flex items-center gap-2">
          {/* <HeartFilled className="text-rose-500" /> */}
          {t.welcomeTitle}
        </span>
      </Title>
      <Paragraph className="relative !mt-4 !mb-0 !text-base !text-slate-600 md:!text-lg">
        {t.welcomeDescription}
      </Paragraph>
      <Button
        type="primary"
        size="large"
        className="relative !mt-8 !h-auto !rounded-full !bg-rose-500 !px-7 !py-3 !font-semibold hover:!bg-rose-600"
        onClick={onShowSeating}
        icon={<SearchOutlined />}
      >
        {t.showSeatsButton}
      </Button>
    </section>
  );
};
