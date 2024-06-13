export default function Button({ children, ...props }) {
  return (
    <button
      className="border-0 border-l border-r border-gray-200 px-4 py-1.5 text-2xl cursor-pointer hover:bg-gray-100"
      {...props}
    >
      {children}
    </button>
  )
}
