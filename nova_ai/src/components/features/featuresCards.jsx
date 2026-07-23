import { defineComponent } from "vue";

const Icons = {
  Bot: () => (
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M9 13v2M15 13v2M9 18h6" />
    </svg>
  ),
  Workflow: () => (
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a1 1 0 0 0 1 1h5m6-4v3a1 1 0 0 1-1 1h-5m0 0v-2" />
    </svg>
  ),
  Search: () => (
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  Mic: () => (
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
    </svg>
  ),
  Analytics: () => (
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  Shield: () => (
    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Close: () => (
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
};

export default defineComponent({
  name: "FeatureCard",
  props: {
    feature: { type: Object, required: true },
    isExpanded: { type: Boolean, default: false },
  },
  emits: ["open", "close"],

  setup(props, { emit }) {
    return () => {
      const IconComponent = Icons[props.feature.iconName] || Icons.Bot;

      return (
        <div
          data-card-content={props.feature.id}
          onClick={() => !props.isExpanded && emit("open", props.feature.id)}
          class={[
            "box-content group relative overflow-hidden transition-all duration-300",
            props.isExpanded
              ? "w-full h-full p-8 md:p-10 rounded-3xl bg-slate-900 border border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.25)] flex flex-col justify-between cursor-default"
              : "w-full h-full p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/90 cursor-pointer flex flex-col justify-between",
          ]}
        >
          {/* Cyan Glow Accent Line */}
          {props.isExpanded && (
            <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          )}

          {/* Top Header Row */}
          <div class="flex items-center justify-between w-full">
            <div class="feature-icon-wrapper">
              <IconComponent />
            </div>

            {props.isExpanded ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  emit("close");
                }}
                class="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close detail view"
              >
                <Icons.Close />
              </button>
            ) : (
              <span class="text-xs font-mono text-cyan-400/80 font-semibold uppercase tracking-wider">
                {props.feature.tag}
              </span>
            )}
          </div>

          {/* Title & Concise Summary */}
          <div class="my-auto pt-4">
            <h3 class={["font-bold text-white tracking-tight", props.isExpanded ? "text-2xl md:text-3xl" : "text-xl"]}>
              {props.feature.title}
            </h3>
            
            {!props.isExpanded && (
              <p class="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
                {props.feature.description}
              </p>
            )}
          </div>

          {/* Expanded Interior Information (Reveals on Modal Expansion) */}
          {props.isExpanded && (
            <div class="modal-inner-details mt-6 pt-6 border-t border-slate-800/80 space-y-6">
              <p class="text-base md:text-lg text-slate-300 leading-relaxed">
                {props.feature.description}
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div class="text-[11px] font-mono text-slate-500 uppercase">Performance</div>
                  <div class="text-sm font-bold text-cyan-400 mt-0.5">Sub-10ms Response</div>
                </div>
                <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div class="text-[11px] font-mono text-slate-500 uppercase">Integration</div>
                  <div class="text-sm font-bold text-cyan-400 mt-0.5">REST & gRPC APIs</div>
                </div>
                <div class="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div class="text-[11px] font-mono text-slate-500 uppercase">Compliance</div>
                  <div class="text-sm font-bold text-cyan-400 mt-0.5">SOC2 Type II</div>
                </div>
              </div>

              <div class="pt-2 flex flex-wrap gap-4">
                <button class="px-6 py-3 bg-cyan-500 text-slate-950 font-bold text-sm rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98] cursor-pointer">
                  Deploy Capability
                </button>
                <button class="px-6 py-3 bg-slate-800/80 text-slate-200 font-semibold text-sm rounded-xl hover:bg-slate-700/80 border border-slate-700/50 transition-all active:scale-[0.98] cursor-pointer">
                  Documentation
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };
  },
});