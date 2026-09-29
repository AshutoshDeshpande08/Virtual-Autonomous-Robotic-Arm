from dataclasses import dataclass


@dataclass
class Joint:
    name: str
    min_angle: float
    max_angle: float
    angle: float = 0.0

    def set_angle(self, angle: float) -> None:
        if angle < self.min_angle or angle > self.max_angle:
            raise ValueError(
                f"{self.name} angle {angle}° is outside "
                f"the allowed range ({self.min_angle}° to {self.max_angle}°)"
            )

        self.angle = angle

    def get_angle(self) -> float:
        return self.angle