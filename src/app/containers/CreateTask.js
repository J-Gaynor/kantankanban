import CreateNewTaskComponent from '@/components/CreateTaskComponent';

export default function CreateTask({text}) {
    class TaskItem {
        id = 0
        desc = '';
    }

    const newTask = new(TaskItem);
    newTask.text = text;

    return(
        <CreateNewTaskComponent/>
    )
}