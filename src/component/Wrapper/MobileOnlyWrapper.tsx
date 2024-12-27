import { MobileOutlined } from "@ant-design/icons";

const MobileOnlyWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* Error overlay for non-mobile devices */}
      <div className="fixed inset-0 hidden lg:flex flex-col items-center justify-center bg-white p-8 text-center z-50">
        <div className="max-w-md space-y-6">
          <MobileOutlined className="text-4xl text-gray-400" />
          <h1 className="text-2xl font-bold text-gray-900">Mobile Only</h1>
          <p className="text-gray-600">
            This content is only available on mobile devices. Please access this
            page from your smartphone or tablet.
          </p>
          <div className="text-sm text-gray-500">
            Recommended screen width: Less than 1024px
          </div>
        </div>
      </div>

      {/* Your app content */}
      {children}
    </>
  );
};

export default MobileOnlyWrapper;
