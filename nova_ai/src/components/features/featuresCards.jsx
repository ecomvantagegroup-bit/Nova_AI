import { defineComponent } from "vue";

// Universal Fallback Icons
const Icons = {
  Bot: () => (
    <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M9 13v2M15 13v2M9 18h6" />
    </svg>
  ),
  Workflow: () => (
    <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M6 9v3a1 1 0 0 0 1 1h5m6-4v3a1 1 0 0 1-1 1h-5m0 0v-2" />
    </svg>
  ),
  Search: () => (
    <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
      <path d="M11 8v6M8 11h6" />
    </svg>
  ),
  Mic: () => (
    <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
    </svg>
  ),
  Analytics: () => (
    <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  ),
  Shield: () => (
    <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  ArrowRight: () => (
    <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
};

export default defineComponent({
  name: "FeatureCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "Explore",
    },
    iconName: {
      type: String,
      default: "Bot",
    },
  },

  setup(props) {
    return () => {
      // Resolve dynamic icon component or fallback
      const IconComponent = Icons[props.iconName] || Icons.Bot;

      return (
        <article class="feature-card">
          <div>
            <div class="feature-icon-wrapper">
              <IconComponent />
            </div>
            <h3 class="feature-card-title">{props.title}</h3>
            <p class="feature-card-desc">{props.description}</p>
          </div>

          <div class="feature-card-footer">
            <span>{props.tag}</span>
            <Icons.ArrowRight />
          </div>
        </article>
      );
    };
  },
});