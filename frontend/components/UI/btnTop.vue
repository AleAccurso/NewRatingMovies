<template>
  <button @click="scrollToTop(showAt)" id="topBtn" title="Go to top">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="toTop"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-caret-up-square"
      viewBox="0 0 16 16"
    >
      <path
        d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
      />
      <path
        d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537z"
      />
    </svg>
  </button>
</template>

<script>
export default {
  data() {
    return {
      mybutton: "",
    };
  },
  props: ["showAt"],
  methods: {
    // When the user clicks on the button, scroll to the top of the document
    scrollToTop() {
      window.scrollTo({ top: 0 });
    },
    //shows the button when scrolling down
    handleScroll(showAt) {
      //500
      if (
        document.body.scrollTop > this.showAt ||
        document.documentElement.scrollTop > this.showAt
      ) {
        this.mybutton.style.display = "block";
      } else {
        this.mybutton.style.display = "none";
      }
    },
  },
  mounted() {
    this.mybutton = document.getElementById("topBtn");
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
#topBtn {
  display: none; /* Hidden by default */
  position: fixed; /* Fixed/sticky position */
  z-index: 99; /* Make sure it does not overlap */
  color: white; /* Text color */
  cursor: pointer; /* Add a mouse pointer on hover */
  bottom: 0; /* Place the button at the bottom of the page */
  right: 0; /* Place the button 30px from the right */
  padding: 0 25px 25px 0;
}
#toTop {
  border-radius: 5px;
  overflow: hidden;
}
#toTop:hover {
  background-color: var(--color-fushia);
}
</style>
