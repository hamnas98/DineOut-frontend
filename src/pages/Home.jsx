import HeroSection from "../components/home/HeroSection"
import RestaurantCarousel from "../components/home/RestaurantCarousel"
import CuisineGrid from "../components/home/CusineGrid"

const Home = () => {
   const restaurants = [
    {
      id: 1,
      name: "Pizza Palace",
      cuisine: "Italian",
      rating: 4.5,
      deliveryTime: "30-40 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfy6hWWFhutGtdiGQStNm33G5eBByNS1Dr0fO8jBuzxjs85tXrj7zvPW0UtEW6uKa_I6CNVpBoOpwvm-VwEaYmgYOywXNLSHn4csq898Ry2N8zVQIz2vU1teFnAZ9t9ietNCDhWn9KSgGgm3aZOmLCziTjg0R0qtvDY7EzKuYc65YcWvMT5ldvGHq0bFTR9JoJX9WtPa-C5BJVXpAG1JJrgN7EvladRBBsCR_vbCBf0SDMDt366dXX1NGrwRGj22bfbxTs9ybWK_PE",
      imageAlt: "A delicious-looking pizza with various toppings"
    },
    {
      id: 2,
      name: "Noodle House",
      cuisine: "Japanese",
      rating: 4.7,
      deliveryTime: "25-35 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqrl5QvcuWi__kIDckIWnlIr-hME3GfnNv856nzaP0OXBPHqMSOmFy0gjEtPRGyrY8F-zPNQxoUeFDNfgwINnOZeeNt_2U1pI3ZCdyZJg1AIt6vqpgQ-Bli_zmTNX--KM23BHQdG-gK0X1dTWQdSmdqceF4JS_DLwTH-0R5_lrzLFyRHg61QmBkDegsYNsiAAsdpI0JODh4aAamQlpYyW8ykCmXHwS7WO1MHAfIEAfuekWjyLmIAYm4p8k-DlzrWFmZdyroJq8cu1Y",
      imageAlt: "A bowl of steaming ramen noodles with egg and pork"
    },
    {
      id: 3,
      name: "Sushi Central",
      cuisine: "Japanese",
      rating: 4.6,
      deliveryTime: "40-50 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXtRdcekaKdNmB5rMrxhMcdUyJzjhzZHG2KqCKff2RiR-eBPE4qRccsIlQGOxtyOgcEwR4jE5a6YJUiWHZtsdzmN0TK_8_CnDQ9OdTcyykcHRffVJdJ-xkzcsQZAvC3bC27XFAVP3NxCwijefgjtyM2gJS0dQOZacqHXGo4YCQOUdP1RKOrsFeeUQmtBnsHYiPd4E5aWU_3FcRNWdQDHMbBEMbDAK6qhegp5bimAlnzOrY9EHluC6_VTcZ1UfeM2h-_DlZ9r5zT9VL",
      imageAlt: "A variety of colorful sushi rolls arranged on a platter"
    },
    {
      id: 4,
      name: "Burger Barn",
      cuisine: "American",
      rating: 4.4,
      deliveryTime: "20-30 min",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6avw61KeXfywwdRtPHD_Qc2W-3Z4LGtwnScX40zKD58YXh2D7FHbS3ib9wdT2rqObcoIkOjBEt-ju5OD5EsDKn4V2MYIVUC1GSjtSJvaRCc0fFS1YS6D064gmtHKcbDfWDlemn8n8Sqxo0OFgRTqDzlcImDmj1iC0FksXpHA6TmOriks1DNszIDT1korsppCom6h_uu-9ZAYRFRLcWeVMz5oaclYSw2eWne4tnKXdsa_xTawpiCVY4kY1m09t_TCKnooUCGJ_rqMo",
      imageAlt: "A juicy double cheeseburger with fries in the background"
    }
  ]

  const cuisines = [
    {
      id: 1,
      name: "Pizza",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0DNSu5YW2qkZJbkzrqKxyFnvXPaQBZG4l9YOtdxkChZvbcamO0BCOCB8pwMtvMlxlIA_eGJvJjhfzlIgP4JVN1925IBUx8J03eUJGn3J_9dIbaU7I3WspgUP_k2TES069s_hguxRXYtLik_5goOKEObxnSTCS8xH0y2sJTRfqDGvhd-5pFKebt7ryycaawt0ibD8vcnBxZ7kpdyhz6rkiIvJdjYOBhOsBC4TaTs90rQGGfTkygegwCtWj2i7ebsW7OC3Y9J_UqijD",
      imageAlt: "A top-down view of a pepperoni pizza"
    },
    {
      id: 2,
      name: "Burgers",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5nDduEjFdOAQjYkLS4A6FiE4EahsJmg_UTRYHgSP_QLKPPgcRic1pP3B-azOR1XEeNIDlXan4v4SreOVxaKwbI2LavOFT36UF5XwnSLIucMLO_NZWxhfcctT1FLLVCihy4hZhg9YgSffhvWPqszqxY9s0PTxMgR7g6N3izWQGiawjUSCyMo10BZx7Um8kYujF1utvnYeMIUmUIMpSGnI4mWQEg6vgZm6Mglg5ocswnFN5zWbglSbvSGIOhjriNkxZfRaSLdGxhCyU",
      imageAlt: "Close-up of a juicy burger"
    },
    {
      id: 3,
      name: "Healthy",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCktNG-da3hHATf-c1G_jdoEAzZzVoSOe8IcXzsrYEkUTd3vaP4z47xdd5Ssi6Av1EruHb7XbG63bb0OF34J3_nqr4xH6dbOgVX1pDY0rjfG7xsmLBU9cNu3x-TK_g2XUtOE_oCTCDu1xPjcN7TYzxVAEyrAWML6JLrfCwwk62_KaO4Hpcj_k3NbA1KMw3LcSrRz3HMTkBKj-eYBS2Kpiw3UpdHt-1t0PG24a5IJ5TfLL6XhK8SaqY7s4-NraV-_TD3ijiDtyx9VPte",
      imageAlt: "A healthy salad bowl with fresh vegetables"
    },
    {
      id: 4,
      name: "Chinese",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj3v9jKZJiNS2tfdsXcsj7Hz0V8CggOLpILJh-quiZLP0j28Jogb4sK800UrkGTVMRbYDQRb-IdVVso9p0eacZyAFcQEWPnzWlOq9N8pivkiHgaDvB8SQ2kr3rLELOScUr7k9c0-9_UqVXUfJNvIjzlkI08VWRxY39nDKW73GmY4JE6w3bfYPY8UZDDZyWmejKwf-GBWSqJ-GSqnFI5FQOcuRTlVQ51Ti5Xp_YbOQcgfE-g_BE1_nTGIfjflMhCs1Id3mKhv-Ii_hr",
      imageAlt: "Assortment of Chinese dumplings"
    },
    {
      id: 5,
      name: "Indian",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAu3sx0uC4jk-HPBvbiq6NgWYv7NXqh-FGgy2irJO-aMzzyBsvLnqNM2mDWPVhsLjv9GNpanllzsTsBhHwJMbzFEU5aTFORIf0zkkab2PMPpa1JQP8iNTRPb1TaTGjB_zpITF5lrc7mkR6xRrbJebl68vpLyEaQqtMdczG5wn7cL47wABh_f3VmOY7u_CX3L4b-7M1aQRZ9svmfEqsPDrVUVu0NnHD6SRsjrfB7ljL5tU2p9aQnOINCTQ84661i8cZ9XMs79XYJLGvs",
      imageAlt: "A warm bowl of Indian curry"
    },
    {
      id: 6,
      name: "Sushi",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1txvBYw83WU3_0yipaRJsmZXoFAhAaUBbBFqf5JSIopVYKJ6NoInfelDY8J9an7PZ6T-paanWRdgVrmML5ejGwjo0JjDDlOd_lmf9Rm7suVxJ5ZCs9COQWqgeHIffrtzkVRz3usFCHM6_YAPOdx0BMW4KQbxllbYy7a-t5GNiQw_y3mEQBxUIXk4I9fqgHsMmnnbNR5VisPgXH_uJwW333NRc-S0E-IjhCa4bgzxNDLEm1y-O_ifs_aFlHHi5F7LzYAkpHdP9pY0Q",
      imageAlt: "Colorful platter of sushi rolls"
    }
  ]

  return (
    <>
    <HeroSection/>
    <RestaurantCarousel restaurants = {restaurants}/>
    <CuisineGrid cuisines = {cuisines}/>
    </>
  )
}

export default Home