import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { kcSanitize } from "keycloakify/lib/kcSanitize";

export default function Code(props: PageProps<Extract<KcContext, { pageId: "code.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { code } = kcContext;

  const { msg } = i18n;

  return (
    <Template
      kcContext={kcContext}
      i18n={i18n}
      doUseDefaultCss={doUseDefaultCss}
      classes={classes}
      headerNode={code.success ? msg("codeSuccessTitle") : msg("codeErrorTitle", code.error)}
    >
      {code.success ? (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-3 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-100 rounded-xl text-sm font-medium mb-6">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Code Generated Successfully
            </div>
          </div>
          
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-white/90 mb-3 text-center">
              {msg("copyCodeInstruction")}
            </label>
            <div className="relative">
              <input 
                id="code"
                type="text"
                defaultValue={code.code}
                readOnly
                className="w-full px-4 py-4 text-lg font-mono text-center bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200 text-white placeholder-white/50"
                style={{ backdropFilter: 'blur(12px)' }}
                onClick={(e) => {
                  e.currentTarget.select();
                  if (navigator.clipboard && code.code) {
                    navigator.clipboard.writeText(code.code);
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard && code.code) {
                    navigator.clipboard.writeText(code.code);
                    const btn = document.querySelector('[data-copy-btn]') as HTMLElement;
                    if (btn) {
                      const originalText = btn.textContent;
                      btn.textContent = 'Copied!';
                      setTimeout(() => btn.textContent = originalText, 2000);
                    }
                  }
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg"
                data-copy-btn
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-white/70 mb-4">
              Click the input field or use the copy button to copy your code
            </p>
            <div className="flex items-center justify-center space-x-2 text-xs text-white/60 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg py-2 px-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Your code will expire shortly</span>
            </div>
          </div>
        </div>
      ) : (
        code.error && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-3 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-100 rounded-xl text-sm font-medium mb-4">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Error Occurred
              </div>
            </div>
            
            <div 
              id="error"
              className="text-center text-white/90 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              dangerouslySetInnerHTML={{
                __html: kcSanitize(code.error)
              }}
            />
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-xl transition-all duration-200 shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
              </button>
            </div>
          </div>
        )
      )}
    </Template>
  );
}
