import Message from "../Message/Message"

export default function Messages() {
  return (
    <section className="messages">
      <div className="messages-wrapper">
        <Message messageText="hola" messageHour="21:29" side="right" />
        <Message
          messageText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum."
          messageHour="21:29"
          side="right"
        />
        <Message
          messageText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima voluptatibus sit iste veniam deleniti vitae nemo aliquam perspiciatis exercitationem molestias. Repellendus iusto id harum. Vero eos itaque beatae iste rerum."
          messageHour="21:29"
          side="right"
        />
        <Message messageText="hola" messageHour="21:29" side="left" />
      </div>
    </section>
  )
}
