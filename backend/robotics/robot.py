import numpy as np

from .joint import Joint
from .kinematics import forward_kinematics, get_position


class RobotArm:
    def __init__(self):

        self.joints = [
            Joint("J1", -180, 180),
            Joint("J2", -120, 120),
            Joint("J3", -150, 150),
            Joint("J4", -180, 180),
            Joint("J5", -120, 120),
            Joint("J6", -360, 360),
        ]

        # Approximate dimensions of our virtual industrial arm.
        #
        # These are intentionally simple for the first version.
        self.dh_parameters = [
            (0.0, np.pi / 2, 0.30, 0.0),
            (0.40, 0.0, 0.0, 0.0),
            (0.30, 0.0, 0.0, 0.0),
            (0.0, np.pi / 2, 0.20, 0.0),
            (0.0, -np.pi / 2, 0.0, 0.0),
            (0.0, 0.0, 0.10, 0.0),
        ]

    def set_joint_angle(self, joint_index: int, angle: float):
        if joint_index < 0 or joint_index >= len(self.joints):
            raise IndexError("Invalid joint index")

        self.joints[joint_index].set_angle(angle)

    def get_joint_angles(self):
        return [
            joint.get_angle()
            for joint in self.joints
        ]

    def calculate_forward_kinematics(self):

        parameters = []

        for i, joint in enumerate(self.joints):

            a, alpha, d, _ = self.dh_parameters[i]

            theta = np.radians(joint.angle)

            parameters.append(
                (a, alpha, d, theta)
            )

        return forward_kinematics(parameters)

    def get_end_effector_position(self):

        transform = self.calculate_forward_kinematics()

        return get_position(transform)

    def home(self):

        for joint in self.joints:
            joint.set_angle(0.0)