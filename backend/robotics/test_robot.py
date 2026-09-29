from robotics.robot import RobotArm


def main():

    robot = RobotArm()

    print("\n==============================")
    print(" VIRTUAL ROBOTIC ARM")
    print("==============================\n")

    print("Initial joint angles:")
    print(robot.get_joint_angles())

    print("\nMoving robot...")

    robot.set_joint_angle(0, 30)
    robot.set_joint_angle(1, -20)
    robot.set_joint_angle(2, 45)

    print("\nCurrent joint angles:")
    print(robot.get_joint_angles())

    position = robot.get_end_effector_position()

    print("\nEnd effector position:")
    print(f"X = {position[0]:.3f} m")
    print(f"Y = {position[1]:.3f} m")
    print(f"Z = {position[2]:.3f} m")

    print("\n==============================\n")


if __name__ == "__main__":
    main()