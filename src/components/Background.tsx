// components/BackgroundEffect.js
export default function BackgroundEffect() {
  return (
    <div
      className="fixed bottom-0 left-0 w-full min-h-screen -z-10"
      style={{
        background: 'radial-gradient(1920px 100% at 50% 100%, rgba(155, 28, 49, 0.6) 0%, rgba(80, 56, 255) )',
      }}
    ></div>
  )
}