import { Body, Controller, Post } from '@nestjs/common';
import { CourseCreator } from '../../../contexts/LearningPlatform/Courses/application/Create/CourseCreator';
import { CourseId } from '../../../contexts/LearningPlatform/Shared/domain/Courses/CourseId';
import { CourseName } from '../../../contexts/LearningPlatform/Courses/domain/CourseName';
import { CourseDuration } from '../../../contexts/LearningPlatform/Courses/domain/CourseDuration';
import { StatsD } from 'hot-shots';

@Controller('courses')
export class CoursesController {
    private statsd: StatsD;

    constructor(private readonly courseCreator: CourseCreator) {
        console.log("CoursesController initialized");
        this.statsd = new StatsD({
            host: process.env.DATADOG_HOST || 'localhost',
            port: parseInt(process.env.DATADOG_PORT || '8125'),
            protocol: 'udp',
            prefix: 'microservice_datadog_example.',
            errorHandler: (error) => {
                console.error('StatsD error:', error);
            },
            globalTags: {
                service: 'learning-platform',
                environment: process.env.NODE_ENV || 'local'
            }
        });
    }

    @Post('/')
    async createCourse(
        @Body() body: { id: string; name: string; duration: string }
    ): Promise<void> {
        const courseId = new CourseId(body.id);
        const courseName = new CourseName(body.name);
        const courseDuration = new CourseDuration(body.duration);

        console.log(courseId);

        await this.courseCreator.run({
            id: courseId,
            name: courseName,
            duration: courseDuration
        });

        console.log("Course created:", body);

        // Use the existing StatsD instance to send metric to DataDog
        this.statsd.increment('courses_created');
    }
}
