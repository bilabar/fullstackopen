const Header = ({ course }) => <h2>{course.name}</h2>

const Total = ({ total }) => <strong>total of {total} exercises</strong>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {
  return parts.map(part =>
    <Part key={part.id} part={part} />
  )
}

const Course = ({ course }) => {
  const total = course.parts.reduce((a, b) => a + b.exercises, 0)

  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  )
}

export default Course