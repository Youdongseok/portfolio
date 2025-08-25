import useLaptopStore from "../store/laptopStore";

const useLaptop = () => {
  const laptop = useLaptopStore(state => state.laptop);
  const toggleLaptop = useLaptopStore(state => state.toggleLaptop);
  const activeLaptop = useLaptopStore(state => state.activeLaptop);

  const toggle = () => toggleLaptop();

  const sendToIframe = () => {
    const iframe = document.getElementById("iframe");
    iframe?.contentWindow?.postMessage({ booting: true }, "*");
  };

  const active = on => {
    activeLaptop(on);
    sendToIframe();
  };

  return { laptop, toggle, active };
};

export default useLaptop;
