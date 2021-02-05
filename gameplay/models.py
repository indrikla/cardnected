from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class DigDeeper(models.Model):
    index = models.IntegerField('Index', null=True, blank=False)
    level = models.IntegerField('Level', default=1,
        validators=[
                MaxValueValidator(5),
                MinValueValidator(1)
            ]
        )
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=100, null=True, blank=False)

    class Meta:
        db_table = 'DigDeeper'

    def __str__(self):
        return self.question

class IceBreak(models.Model):
    index = models.IntegerField('Index', null=True, blank=False)
    level = models.IntegerField('Level', default=1,
        validators=[
                MaxValueValidator(5),
                MinValueValidator(1)
            ]
        )
    question = models.TextField('Question', max_length=400, null=True, blank=False)
    image = models.CharField('Image', max_length=100, null=True, blank=False)

    class Meta:
        db_table = 'IceBreak'

    def __str__(self):
        return self.question